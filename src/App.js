import React, { Component } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import GridLayout from "react-grid-layout";
import PouchDB from "pouchdb";

import InsertBox from "components/InsertBox";
import InsertForm from "components/InsertForm";
import Note from "components/Note";
import Tool from "components/Tool";
import CheckboxList from "components/CheckboxList";
import Backdrop from "components/Backdrop";

import { checkListItem, setListItemLabel } from "helper/listNote";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: #dee2e2;
`;

const InputContent = styled(TextareaAutosize)`
  width: 100%;
  font-family: Roboto Slab;
  font-size: 14px;
  color: black;
  border: 0px;
  outline: 0px;
  resize: none;
  margin-bottom: 12px;

  &::placeholder {
    color: #bbb;
    user-select: none;
  }
`;

const StyledGrid = styled(GridLayout)`
  margin: auto;
  width: 960px;
`;

const EditForm = styled(InsertForm)`
  margin-top: 128px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      newNote: {},
      editNote: {},
      isCreate: false,
      isEdit: false
    };

    this.loadAllNotes = this.loadAllNotes.bind(this);
    this.clear = this.clear.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.submit = this.submit.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.updateListItemLabel = this.updateListItemLabel.bind(this);
    this.updateListItemCheck = this.updateListItemCheck.bind(this);
    this.createListItem = this.createListItem.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    this.db = new PouchDB("notia");
    this.loadAllNotes();
  }

  /**
   * Load all notes from Database
   *
   * @memberof App
   */
  async loadAllNotes() {
    try {
      const { rows } = await this.db.allDocs({ include_docs: true });
      const notes = rows.map(({ doc }) => doc);

      this.setState({ notes });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Clear note form
   *
   * @param {string} formName - Form's name in state
   * @memberof App
   */
  clear(formName) {
    const isOpen = formName === "newNote" ? "isCreate" : "isEdit";

    this.setState({
      [isOpen]: false,
      [formName]: {
        title: "",
        type: "text",
        content: ""
      }
    });
  }

  /**
   * Submit created or edited note
   *
   * @param {string} formName - Form's name in state
   * @memberof App
   */
  submit(formName) {
    this.setState(prevState => {
      const { notes } = prevState;
      const form = prevState[formName];
      const baseHeight = 1.7;
      const totalCols = 3;
      const x = notes.length % totalCols + 1;
      const y = parseInt(notes.length / totalCols, 10);
      let h, content, result;

      switch (form.type) {
        case "text":
          const charPerLine = 35;
          const totalChars = form.content.length;
          const totalLines = totalChars / charPerLine;
          const heightPerLine = 0.39;

          content = form.content;
          h = baseHeight + totalLines * heightPerLine;
          break;
        case "list":
          content = form.content.filter(item => !item.isNew);
          h = baseHeight + content.length * 0.65;
          break;
        default:
          break;
      }

      if (formName === "editNote") {
        result = {
          notes: notes.map(note => {
            if (form._id === note._id) {
              const result = {
                ...note,
                title: form.title,
                content: content,
                updatedAt: Date.now()
              };

              // Update note to database
              this.db.put(result);

              return result;
            }

            return note;
          })
        };
      } else {
        const note = {
          ...form,
          _id: `${notes.length + 1}`,
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          grid: {
            x,
            y,
            w: 1,
            h
          }
        };

        // Save note to database
        this.db.put(note);

        result = {
          notes: [...notes, note]
        };
      }

      return result;
    }, this.loadAllNotes);
  }

  /**
   * Create new note
   *
   * @param {string} type - Note type
   * @memberof App
   */
  create(type) {
    this.setState(prevState => {
      let content;

      switch (type) {
        case "text":
          content = "";

          return {
            isCreate: true,
            newNote: { ...prevState.newNote, type, content }
          };
        case "list":
          content = [
            {
              _id: null,
              label: "",
              isChecked: false,
              isNew: true
            }
          ];

          return {
            isCreate: true,
            newNote: { ...prevState.newNote, focusIndex: -1, type, content }
          };
        default:
          return prevState;
      }
    });
  }

  /**
   * Edit an existing note
   *
   * @param {object} note - Note which want to be edited
   * @param {string} note._id - Note's ID
   * @param {string} note.title - Note's title
   * @param {string} note.type - Note's type
   * @param {(string|object[])} note.content - Note's content based on it's type
   * @param {number} note.createdAt - Time when note was created
   * @param {number} note.updatedAt - Time when note was edited
   * @memberof App
   */
  edit(note) {
    let { content } = note;

    if (note.type === "list") {
      content = [
        ...content,
        {
          _id: null,
          label: "",
          isChecked: false,
          isNew: true
        }
      ];
    }

    this.setState({
      isEdit: true,
      editNote: {
        ...note,
        content
      }
    });
  }

  /**
   * Handle form update
   *
   * @param {string} formName - Form's name in state
   * @param {object} data - Specified field which want to be updated
   * @memberof App
   */
  handleForm(formName, data) {
    this.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        ...data
      }
    }));
  }

  /**
   * Update a list item check
   *
   * @param {string} formName - Form's name in state
   * @param {string} itemID - Selected item ID
   * @param {string} [noteID=-1] - Selected note ID
   * @memberof App
   */
  updateListItemCheck(formName, itemID, noteID = "-1") {
    this.setState(prevState => {
      const { notes } = prevState;
      const isCheckInForm = noteID === "-1";

      if (!isCheckInForm) {
        return {
          notes: notes.map(note => {
            if (noteID === note._id) {
              return {
                ...note,
                content: checkListItem(note.content, itemID)
              };
            }

            return note;
          })
        };
      }

      return {
        [formName]: {
          ...prevState[formName],
          content: checkListItem(prevState[formName].content, itemID)
        }
      };
    });
  }

  /**
   * Update a list item label
   *
   * @param {string} formName - Form's name in state
   * @param {string} label - New label
   * @param {string} itemID - Selected item ID
   * @memberof App
   */
  updateListItemLabel(formName, label, itemID) {
    this.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        content: setListItemLabel(prevState[formName].content, label, itemID)
      }
    }));
  }

  /**
   * Delete a list item
   *
   * @param {string} formName - Form's name in state
   * @param {string} itemID - Selected item ID
   * @memberof App
   */
  deleteListItem(formName, itemID) {
    this.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        content: prevState[formName].content.filter(item => itemID !== item._id)
      }
    }));
  }

  /**
   * Create new itemID
   *
   * @param {string} formName - Form's name in state
   * @param {string} itemID - Selected item ID
   * @param {number} itemIndex - Selected item index
   * @memberof App
   */
  createListItem(formName, itemID, itemIndex) {
    this.setState(prevState => {
      const { content } = prevState[formName];
      const lastID = `${content.length}`;
      // Is cursor focus on last item created (above blank new item)
      const isLastItem = itemID === lastID;
      // Is cursor focus on blank new item (very bottom of the list)
      const isBlankNew = !itemID;
      let newContent;

      const blankItem = {
        _id: null,
        label: "",
        isChecked: false,
        isNew: true
      };

      // If cursor focus in middle list not blank new one
      if (!isBlankNew) {
        newContent = content.slice(0);

        if (!isLastItem) {
          // Show with checkbox instead of plus icon
          const newItem = {
            ...blankItem,
            _id: lastID,
            isNew: false
          };
          // Insert blank new item between created items
          newContent.splice(itemIndex + 1, 0, newItem);
        }
      } else {
        // Show checkbox on current created item
        // Instead of plus icon
        // Apply new item as created item
        const applyCreatedItem = item => {
          if (itemID === item._id) {
            return {
              ...item,
              _id: lastID,
              isNew: false
            };
          }

          return item;
        };

        newContent = [...content.map(applyCreatedItem), blankItem];
      }

      return {
        [formName]: {
          ...prevState[formName],
          content: newContent,
          focusIndex: itemIndex + 1
        }
      };
    });
  }

  /**
   * Delete a note
   *
   * @param {string} noteID - Selected note ID
   * @memberof App
   */
  async deleteNote(noteID) {
    try {
      // Delete note from Database
      const note = await this.db.get(noteID);
      await this.db.remove(note);

      this.setState(prevState => ({
        notes: prevState.notes.filter(note => noteID !== note._id)
      }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { notes, newNote, editNote, isCreate, isEdit } = this.state;

    return (
      <Container
        onClick={e => {
          // Close form if empty place clicked
          if (e.target === e.currentTarget) {
            this.clear("newNote");
          }
        }}
      >
        {!isCreate ? (
          <InsertBox onClick={() => this.create("text")}>
            <Tool
              icon="list"
              tooltip="New List"
              onClick={() => this.create("list")}
            />
          </InsertBox>
        ) : (
          <InsertForm
            title={newNote.title}
            onFocusTitle={() => this.handleForm("newNote", { focusIndex: -1 })}
            onChangeTitle={e =>
              this.handleForm("newNote", { title: e.target.value })
            }
            onClickDone={() => {
              this.submit("newNote");
              this.clear("newNote");
            }}
          >
            {newNote.type === "text" && (
              <InputContent
                rows={1}
                placeholder="What do you think ?"
                value={newNote.content}
                onChange={e =>
                  this.handleForm("newNote", { content: e.target.value })
                }
              />
            )}
            {newNote.type === "list" && (
              <CheckboxList
                items={newNote.content}
                focusIndex={newNote.focusIndex}
                onFocus={focusIndex =>
                  this.handleForm("newNote", { focusIndex })
                }
                onChangeLabel={(label, itemID) =>
                  this.updateListItemLabel("newNote", label, itemID)
                }
                onClickDelete={itemID => this.deleteListItem("newNote", itemID)}
                onChangeCheck={itemID =>
                  this.updateListItemCheck("newNote", itemID)
                }
                onPressEnter={(itemID, itemIndex) =>
                  this.createListItem("newNote", itemID, itemIndex)
                }
              />
            )}
          </InsertForm>
        )}

        <StyledGrid
          cols={3}
          rowHeight={32}
          width={960}
          compactType="horizontal"
          margin={[24, 24]}
          isResizable={false}
        >
          {notes.map(note => (
            <div key={note._id} data-grid={note.grid}>
              <Note
                title={note.title}
                type={note.type}
                content={note.content}
                onChangeCheck={itemID =>
                  this.updateListItemCheck("newNote", itemID, note._id)
                }
                onClickClose={e => this.deleteNote(note._id)}
                onClick={e => {
                  const { target } = e;
                  const isCheckBox = target.type === "checkbox";
                  const isCloseButton = target.className.includes("material");

                  if (!isCheckBox && !isCloseButton) {
                    this.edit(note);
                  }
                }}
              />
            </div>
          ))}
        </StyledGrid>

        <Backdrop
          isOpen={isEdit}
          onClick={e => {
            // Close form if empty place clicked
            if (e.target === e.currentTarget) {
              this.clear("editNote");
            }
          }}
        >
          <EditForm
            title={editNote.title}
            mode="edit"
            timestamp={editNote.updatedAt}
            onFocusTitle={() => this.handleForm("editNote", { focusIndex: -1 })}
            onChangeTitle={e =>
              this.handleForm("editNote", { title: e.target.value })
            }
            onClickDone={() => {
              this.submit("editNote");
              this.clear("editNote");
            }}
          >
            {editNote.type === "text" && (
              <InputContent
                rows={1}
                placeholder="What do you think ?"
                value={editNote.content}
                onChange={e =>
                  this.handleForm("editNote", { content: e.target.value })
                }
              />
            )}
            {editNote.type === "list" && (
              <CheckboxList
                items={editNote.content}
                focusIndex={editNote.focusIndex}
                onFocus={focusIndex =>
                  this.handleForm("editNote", { focusIndex })
                }
                onChangeLabel={(label, itemID) =>
                  this.updateListItemLabel("editNote", label, itemID)
                }
                onClickDelete={itemID =>
                  this.deleteListItem("editNote", itemID)
                }
                onChangeCheck={itemID =>
                  this.updateListItemCheck("editNote", itemID)
                }
                onPressEnter={(itemID, itemIndex) =>
                  this.createListItem("editNote", itemID, itemIndex)
                }
              />
            )}
          </EditForm>
        </Backdrop>
      </Container>
    );
  }
}

export default App;

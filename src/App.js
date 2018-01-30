import React, { Component } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import GridLayout from "react-grid-layout";

import InsertBox from "components/InsertBox";
import InsertForm from "components/InsertForm";
import Note from "components/Note";
import Tool from "components/Tool";
import CheckboxList from "components/CheckboxList";

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      newNote: {},
      isCreate: false
    };

    this.clear = this.clear.bind(this);
    this.create = this.create.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.submit = this.submit.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.updateListItemLabel = this.updateListItemLabel.bind(this);
    this.updateListItemCheck = this.updateListItemCheck.bind(this);
    this.createListItem = this.createListItem.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  /**
   * Clear note form
   *
   * @memberof App
   */
  clear() {
    this.setState({
      isCreate: false,
      newNote: {
        title: "",
        type: "text",
        content: ""
      }
    });
  }

  /**
   * Submit new note
   *
   * @memberof App
   */
  submit() {
    this.setState(prevState => {
      const { newNote, notes } = prevState;
      const baseHeight = 1.7;
      const totalCols = 3;
      const x = notes.length % totalCols + 1;
      const y = parseInt(notes.length / totalCols, 10);
      let h, content;

      switch (newNote.type) {
        case "text":
          const charPerLine = 35;
          const totalChars = newNote.content.length;
          const totalLines = totalChars / charPerLine;
          const heightPerLine = 0.39;

          content = newNote.content;
          h = baseHeight + totalLines * heightPerLine;
          break;
        case "list":
          content = newNote.content.filter(item => !item.isNew);
          h = baseHeight + content.length * 0.65;
          break;
        default:
          break;
      }

      return {
        notes: [
          ...notes,
          {
            ...newNote,
            content,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            grid: {
              x,
              y,
              w: 1,
              h
            }
          }
        ]
      };
    });
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
   * Handle form update
   *
   * @param {object} data - Specified field which want to be updated
   * @memberof App
   */
  handleForm(data) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        ...data
      }
    }));
  }

  /**
   * Update a list item check
   *
   * @param {number} itemIndex - Selected item index
   * @param {number} [noteIndex=-1] - Selected note index
   * @memberof App
   */
  updateListItemCheck(itemIndex, noteIndex = -1) {
    this.setState(prevState => {
      const { notes, newNote } = prevState;

      if (noteIndex > -1) {
        return {
          notes: notes.map((note, index) => {
            if (noteIndex === index) {
              return {
                ...note,
                content: checkListItem(note.content, itemIndex)
              };
            }

            return note;
          })
        };
      }

      return {
        newNote: {
          ...newNote,
          content: checkListItem(newNote.content, itemIndex)
        }
      };
    });
  }

  /**
   * Update a list item label
   *
   * @param {string} label - New label
   * @param {number} itemIndex - Selected index
   * @memberof App
   */
  updateListItemLabel(label, itemIndex) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        content: setListItemLabel(prevState.newNote.content, label, itemIndex)
      }
    }));
  }

  /**
   * Delete a list item
   *
   * @param {number} itemIndex - Selected index
   * @memberof App
   */
  deleteListItem(itemIndex) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        content: prevState.newNote.content.filter(
          (item, index) => itemIndex !== index
        )
      }
    }));
  }

  /**
   * Create new list item
   *
   * @param {number} itemIndex - Selected index
   * @memberof App
   */
  createListItem(itemIndex) {
    this.setState(prevState => {
      const { content } = prevState.newNote;
      const lastIndex = content.length - 1;
      // Is cursor focus on last item created (above blank new item)
      const isLastItem = itemIndex === lastIndex - 1;
      // Is cursor focus on blank new item (very bottom of the list)
      const isBlankNew = itemIndex === lastIndex;
      let newContent;

      const blankItem = {
        label: "",
        isChecked: false,
        isNew: true
      };

      // Apply new item as created item
      const applyCreatedItem = (item, index) => {
        if (itemIndex === index) {
          return {
            ...item,
            isNew: false
          };
        }

        return item;
      };

      if (!isBlankNew) {
        newContent = content.slice(0);

        if (!isLastItem) {
          // Show with checkbox instead of plus icon
          blankItem.isNew = false;
          // Insert blank new item between created items
          newContent.splice(itemIndex + 1, 0, blankItem);
        }
      } else {
        // Show checkbox on current created item
        // Instead of plus icon
        newContent = [...content.map(applyCreatedItem), blankItem];
      }

      return {
        newNote: {
          ...prevState.newNote,
          content: newContent,
          focusIndex: itemIndex + 1
        }
      };
    });
  }

  /**
   * Delete a note
   *
   * @param {number} noteIndex - Selected note index
   * @memberof App
   */
  deleteNote(noteIndex) {
    this.setState(prevState => ({
      notes: prevState.notes.filter((note, index) => noteIndex !== index)
    }));
  }

  render() {
    const { notes, newNote, isCreate } = this.state;

    return (
      <Container>
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
            onFocusTitle={() => this.handleForm({ focusIndex: -1 })}
            onChangeTitle={e => this.handleForm({ title: e.target.value })}
            onClickDone={() => {
              this.submit();
              this.clear();
            }}
          >
            {newNote.type === "text" && (
              <InputContent
                rows={1}
                placeholder="What do you think ?"
                value={newNote.content}
                onChange={e => this.handleForm({ content: e.target.value })}
              />
            )}
            {newNote.type === "list" && (
              <CheckboxList
                items={newNote.content}
                focusIndex={newNote.focusIndex}
                onFocus={focusIndex => this.handleForm({ focusIndex })}
                onChangeLabel={this.updateListItemLabel}
                onClickDelete={this.deleteListItem}
                onChangeCheck={this.updateListItemCheck}
                onPressEnter={this.createListItem}
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
          {notes.map((note, index) => (
            <div key={index} data-grid={note.grid}>
              <Note
                title={note.title}
                type={note.type}
                content={note.content}
                onChangeCheck={itemIndex =>
                  this.updateListItemCheck(itemIndex, index)
                }
                onClickClose={() => this.deleteNote(index)}
              />
            </div>
          ))}
        </StyledGrid>
      </Container>
    );
  }
}

export default App;

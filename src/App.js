import React, { Component } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

import InsertBox from "components/InsertBox";
import InsertForm from "components/InsertForm";

import Tool from "components/Tool";
import CheckboxList from "components/CheckboxList";

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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: #dee2e2;
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
    this.handleListItemFocus = this.handleListItemFocus.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.updateListItemLabel = this.updateListItemLabel.bind(this);
    this.updateListItemCheck = this.updateListItemCheck.bind(this);
    this.createListItem = this.createListItem.bind(this);
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
    this.setState(prevState => ({
      notes: [{ ...prevState.newNote }, ...prevState.notes]
    }));
  }

  /**
   * Create new note
   *
   * @param {string} type
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
   * @param {object} data
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
   * Handle focus on list item
   *
   * @param {number} index
   * @memberof App
   */
  handleListItemFocus(index) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        focusIndex: index
      }
    }));
  }

  /**
   * Update a list item check
   *
   * @param {number} itemIndex
   * @memberof App
   */
  updateListItemCheck(itemIndex) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        content: prevState.newNote.content.map((item, index) => {
          if (itemIndex === index) {
            return {
              ...item,
              isChecked: !item.isChecked
            };
          }

          return item;
        })
      }
    }));
  }

  /**
   * Update a list item label
   *
   * @param {string} label
   * @param {number} itemIndex
   * @memberof App
   */
  updateListItemLabel(label, itemIndex) {
    this.setState(prevState => ({
      newNote: {
        ...prevState.newNote,
        content: prevState.newNote.content.map((item, index) => {
          if (itemIndex === index) {
            return {
              ...item,
              label
            };
          }

          return item;
        })
      }
    }));
  }

  /**
   * Delete a list item
   *
   * @param {number} itemIndex
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
   * @param {number} itemIndex
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

  render() {
    const { newNote, isCreate } = this.state;

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
            onFocusTitle={() => this.handleListItemFocus(-1)}
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
                onFocus={this.handleListItemFocus}
                onChangeLabel={this.updateListItemLabel}
                onClickDelete={this.deleteListItem}
                onChangeCheck={this.updateListItemCheck}
                onPressEnter={this.createListItem}
              />
            )}
          </InsertForm>
        )}
      </Container>
    );
  }
}

export default App;

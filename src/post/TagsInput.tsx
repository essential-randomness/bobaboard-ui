import React from "react";

import classnames from "classnames";
import debug from "debug";

const log = debug("bobaui:tagsinput-log");

const TagsInput: React.FC<TagsInputProps> = ({ tags, onTagsChange }) => {
  const [deleteState, setDeleteState] = React.useState(false);
  return (
    <>
      <div className="container">
        {!!tags.length && (
          <>
            {tags.map((tag, index) => (
              <div
                key={tag}
                className={classnames("tag", {
                  deleting: deleteState && index == tags.length - 1,
                })}
              >
                {tag}
              </div>
            ))}
          </>
        )}
        <span
          className="tag-input"
          placeholder="add a tag..."
          onKeyDown={(e) => {
            const inputValue = (e.target as HTMLSpanElement).innerText;

            if (inputValue.length == 0 && e.key == "Backspace") {
              log(`Received backspace on empty tag`);
              if (!deleteState) {
                log(`Entering delete state for previous tag`);
                setDeleteState(true);
                return;
              }
              log(`Deleting previous tag`);
              setDeleteState(false);
              onTagsChange(tags.slice(0, -1));
              return;
            }
            setDeleteState(false);

            if (e.key === "Enter") {
              if (inputValue.trim().length == 0) {
                log(`Received enter on empty tag`);
                return;
              }
              log(`Entering new tag ${inputValue}`);
              onTagsChange([...tags, inputValue]);
              (e.target as HTMLInputElement).innerText = "";
              e.preventDefault();
            }
          }}
          onKeyUp={(e) => {
            const target = e.target as HTMLSpanElement;
            const parent = target.parentElement;
            const currentPosition =
              target.getBoundingClientRect().left -
              parent.getBoundingClientRect().left;
            console.log(currentPosition);
            target.style.display = currentPosition < 10 ? "normal" : "nowrap";
          }}
          contentEditable={true}
        >
          add a tag...
        </span>
      </div>
      <style jsx>{`
        .container {
          padding: 5px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
        }
        .tag-input {
          flex: 1;
          word-break: break-word;
          max-width: 500px;
          padding: 5px;
          margin: 2px 2px;
        }
        .tag:before {
          content: "#";
        }
        .tag {
          display: inline-block;
          color: blue;
          background-color: yellow;
          word-break: break-word;
          padding: 5px;
          margin: 2px 2px;
        }
        .tag.deleting {
          color: red;
        }
      `}</style>
    </>
  );
};

export default TagsInput;

export interface TagsInputProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
}
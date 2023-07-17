import { ContentState, EditorState, convertFromHTML } from "draft-js";

export const convertHTMLtoEditorState = (htmlAsString: string) => {
  if (typeof window === "undefined") return EditorState.createEmpty();
  const blocksFromHTML = convertFromHTML(htmlAsString || '');
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(content);
};

export const getWordCount = (state: EditorState) => {
  const plainText = state.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
  return wordArray ? wordArray.length : 0;
};

export const getCharCount = (state: EditorState) => {
  const plainText = state.getCurrentContent().getPlainText("");
  const cleanString = plainText.replace(/\s/g, "").trim(); // replace above characters w/ space
  return cleanString.length;
};

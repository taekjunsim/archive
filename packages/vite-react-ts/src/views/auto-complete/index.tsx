/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Trie } from "./Trie";

export default function AutoComplete() {
  const trie = Trie();

  [
    "pro",
    "proto",
    "prou",
    "protorype",
    "programmers",
    "primary",
    "proud",
    "picnic",
    "plz dm",
  ].forEach((word) => {
    trie.insert(word);
  });

  return <Detail trie={trie} />;
}

const Detail = ({ trie }: any) => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<string[]>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = trie.getMatchedWord(e.target.value);
    setSearchResult(result);
    setInput(e.target.value);
  };

  return (
    <div>
      <input value={input} onChange={handleInput} />
      {input && (
        <div css={dropdownList}>
          {searchResult?.map((el) => {
            return (
              <div css={dropdownItem} key={el}>
                {el}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const dropdownList = {
  display: "flex",
  flexDirection: "column" as const,
  width: "100px",
};

const dropdownItem = {
  border: `1px solid red`,

  "&:not(:last-of-type)": {
    borderBottom: "none",
  },
};

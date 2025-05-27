type NodeType = {
  children: { [key: string]: NodeType };
  isEnd: boolean;
};

function makeNode(): NodeType {
  let children = {};
  let isEnd = false;

  return { children, isEnd };
}

export function Trie() {
  const root = makeNode();

  const insert = (word: string) => {
    let node = root;

    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = makeNode();
      }

      node = node.children[char];
    }

    node.isEnd = true;
  };

  const getMatchedWord = (str: string) => {
    let node = root;

    for (let char of str) {
      if (!node.children[char]) {
        return [];
      }

      node = node.children[char];
    }

    return getEveryMatchedWordsFromNode(node, str);
  };

  const getEveryMatchedWordsFromNode = (
    node: NodeType,
    str: string
  ): string[] => {
    let words = [];
    if (node.isEnd) {
      words.push(str);
    }

    for (let char in node.children) {
      words = words.concat(
        getEveryMatchedWordsFromNode(node.children[char], str + char)
      );
    }

    return words;
  };

  return { insert, getMatchedWord };
}

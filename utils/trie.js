// utils/trie.js

export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class CommandTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEndOfWord = true;
  }

  getAllWordsFromNode(node, prefix) {
    let results = [];
    if (node.isEndOfWord) results.push(prefix);

    for (const ch in node.children) {
      results = results.concat(this.getAllWordsFromNode(node.children[ch], prefix + ch));
    }

    return results;
  }

  search(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    return this.getAllWordsFromNode(node, prefix);
  }

  getCommonPrefix(prefix) {
    const matches = this.search(prefix);
    if (matches.length <= 1) return matches[0] || prefix;

    let commonPrefix = prefix;
    while (true) {
      const nextCharSet = new Set(matches.map(cmd => cmd[commonPrefix.length]));
      if (nextCharSet.size === 1 && ![...nextCharSet][0]?.includes(" ")) {
        commonPrefix += [...nextCharSet][0];
      } else {
        break;
      }
    }
    return commonPrefix;
  }
}
//#Name - Word Wrapper
//#Author - Maxolian2010
//#Version - 1.0


(function(Scratch) {
    'use strict';

    class WordWrappingSplitter {
        getInfo() {
            return {
                id: 'wordWrapTextSplitter',
                name: 'Word Wrap Text',
                blocks: [
                    {
                        opcode: 'splitTextSafely',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Wrap [TEXT] to [CHARS] chars per line (no word cuts)',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'This is a sentence with aSuperLongWordThatExceedsLimits.'
                            },
                            CHARS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        }
                    }
                ]
            };
        }

        splitTextSafely(args) {
            const text = String(args.TEXT).trim();
            const maxChars = parseInt(args.CHARS);

            if (isNaN(maxChars) || maxChars <= 0) {
                return 'Error: Invalid character limit';
            }

            const words = text.split(/\s+/);
            let lines = [];
            let currentLine = '';

            for (const word of words) {
                if ((currentLine + ' ' + word).trim().length <= maxChars) {
                    currentLine = (currentLine + ' ' + word).trim();
                } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word; // even if word is longer than maxChars
                }
            }

            if (currentLine) lines.push(currentLine);
            return lines.join('\n');
        }
    }

    Scratch.extensions.register(new WordWrappingSplitter());
})(Scratch);

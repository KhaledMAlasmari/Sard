import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, quotePlugin } from '@mdxeditor/editor'
import { ScrollArea } from './ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import { DiscIcon } from "@radix-ui/react-icons";
import { useStore } from '@/utils/socketStore';

function TextEditor({ chapter_id, setEditText}: { chapter_id: number, setEditText:  React.Dispatch<React.SetStateAction<number>> }) {
  const toolbar = useRef(null);
  const changeChapterStory = useStore((state) => state.changeChapterStory);
  const generated_story = useStore((state) => state.generated_story);
  //@ts-ignore
  const [newText, setNewText] = useState(generated_story?.story[chapter_id - 1].chapter_story!);
  useEffect(() => {
    // Step 3: Access and Modify the Style
    if (toolbar.current) {
      //@ts-ignore
      const parentNode = toolbar.current.parentNode
      parentNode.style.margin = '0px'
      parentNode.style.backgroundColor = '#111827'
      // Add more style modifications as needed
    }
  }, []);

  const saveChapter = () => {
    changeChapterStory(chapter_id, newText)
    setEditText(-1)
  }
  
  const changeTextState = (event: string) => {
    setNewText(event)
    
  }
  
  return (
    <MDXEditor
      className='dark-theme dark_toolbar'
      markdown={newText}
      onChange={changeTextState}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <div className='flex ' ref={toolbar} >

              <UndoRedo />
              <button onClick={saveChapter}>Save</button>
            </div>
          ),

        }),
      ]}
    />
  )
}

export default TextEditor

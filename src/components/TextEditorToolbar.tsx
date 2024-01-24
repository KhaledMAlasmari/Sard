import React from 'react'

import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, DiffSourceToggleWrapper, ConditionalContents } from '@mdxeditor/editor'


/**
 * A toolbar component that includes all toolbar components.
 * Notice that some of the buttons will work only if you have the corresponding plugin enabled, so you should use it only for testing purposes.
 * You'll probably want to create your own toolbar component that includes only the buttons that you need.
 */
export const TextEditorToolbar: React.FC = () => {
  return (
    <div className='w-128'>
      <UndoRedo />

    </div>
  )
}

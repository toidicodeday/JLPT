import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

interface Props {
  value?: any
  onChange?: any
  disabled?: boolean
}

const RichTextEditor = ({ value, onChange, disabled }: Props) => {
  return (
    <Editor
      apiKey="fgh6gabmitcff5vdqbarlha8hh6w839de9awjzvnw6zr9ye5"
      // onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'emoticons',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter | ' +
          'alignright alignjustify | bullist numlist outdent indent | emoticons |' +
          'removeformat | help |' +
          'image link',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      value={value}
      onEditorChange={value => {
        onChange(value)
      }}
      disabled={disabled}
    />
  )
}

export default RichTextEditor

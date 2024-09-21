// src/types/react-quill.d.ts
declare module 'react-quill' {
    import { Component } from 'react';
  
    export interface ReactQuillProps {
      value: string;
      onChange: (content: string) => void;
      placeholder?: string;
      theme?: string;
      className?: string;
      modules?: {
        toolbar?: Array<string | { [key: string]: any }>;
      };
      style?: React.CSSProperties;
    }
  
    export default class ReactQuill extends Component<ReactQuillProps> {}
  }
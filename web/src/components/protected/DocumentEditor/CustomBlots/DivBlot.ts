'use client'

import { Quill } from "react-quill";

const Block = Quill.import('blots/block');

class DivBlot extends Block {
    static create(value: any): HTMLElement {
        const node = super.create(value) as HTMLElement;
        console.log("Blot");
        node.setAttribute('class', 'page-size mb-4');
        node.style.width = '210mm !important';  // A4 width
        node.style.height = '297mm !important';  // A4 height
        node.style.color = '#1E1E1E !important'; // Text color
        return node;
    }
  
    static formats(node: HTMLElement): { [key: string]: any } {
        return { class: node.getAttribute('class') };
    }
}

DivBlot.blotName = 'div';
DivBlot.tagName = 'div';
Quill.register(DivBlot);

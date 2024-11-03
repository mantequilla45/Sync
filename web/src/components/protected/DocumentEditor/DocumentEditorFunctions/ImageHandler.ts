import Quill from 'quill'
import { Range } from 'react-quill';
import { uploadImageToServer } from './DocumentEditorBasicSocketIO';

export const handleImage = (editor: Quill, indexPos: Range) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadImageToServer(file);

                if (indexPos?.index != null) {
                    editor.insertEmbed(indexPos.index, 'image', imageUrl, 'user');
                }
            } catch (error) {
                console.error('Error uploading image', error);
            }
        }
    };
};
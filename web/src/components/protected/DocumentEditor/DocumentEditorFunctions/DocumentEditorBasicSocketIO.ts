import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
import { UnprivilegedEditor, Range } from 'react-quill';
import Quill, { Delta, Sources } from 'quill'

export const handleContentChange = (newContent: string, delta: Delta, source: string, quillEditor: UnprivilegedEditor, setContent: (content: string) => void, documentID: string) => {
    if (source === 'user') {
        useDocumentSocketStore.getState().documentSocket?.emit('updateContent', documentID, newContent, delta);
        setContent(newContent);
    }
};

export const handleContentUpdated = (newContent: any, setContent: (content: string) => void) => {
    setContent(newContent);
};

export const handleChangePos = (selection: Range, source: Sources, editor: UnprivilegedEditor, documentID: string, setPosition: (range: Range) => void) => {
    if (source === 'user') {
        useDocumentSocketStore.getState().documentSocket?.emit('cursor-position', documentID, selection);
        setPosition(selection)
    }
}

export const handleSave = (documentID: string, projectID: string) => {
    useDocumentSocketStore.getState().documentSocket?.emit('saveDocument', documentID, projectID);
}

export const handlePaste = (event: ClipboardEvent, editor: Quill, indexPos: Range) => {
    const clipboardData = event.clipboardData;
    const items = Array.from(clipboardData?.items || []);
    const hasImage = items.some(item => item.type.includes("image"));
    if (hasImage) {
        event.preventDefault();

        items.forEach((item) => {
            if (item.type.includes("image")) {
                const file = item.getAsFile();
                file && uploadImageToServer(file).then((url: string) => {
                    console.log(url);
                    console.log(indexPos?.index as number);
                    editor.insertEmbed(indexPos?.index as number, "image", url, "user");
                });
            }
        });
    }
}

export async function uploadImageToServer(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch('/api/Document/UploadImage', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    const { url } = await response.json();
    return url;
}

var gEditor;

ClassicEditor.create(document.querySelector('#editor')).then(editor => {
    gEditor = editor;
    console.log(editor);
}).catch(error => {
    console.error(error);
});

function getEditorData(){
    $("#editor_data").val(gEditor.getData());
}
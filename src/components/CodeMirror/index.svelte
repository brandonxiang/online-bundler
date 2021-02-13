<div class="code-editor">
  <textarea bind:this="{refs.editor}" value readonly></textarea>
</div>

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import CodeMirror from './CodeMirror';
  export let value;
  export let readonly = false;
  export let height;

  const dispatch = createEventDispatcher();
  let editor = null;

  const refs = {};

  const mode = 'js';

  const modes = {
    js: {
      name: 'javascript',
      json: false
    },
    json: {
      name: 'javascript',
      json: true
    },
    svelte: {
      name: 'handlebars',
      base: 'text/html'
    },
    md: {
      name: 'markdown'
    }
  };

  onMount(() => {
    const opts = {
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: true,
      indentUnit: 2,
      tabSize: 2,
      value: '',
      mode: modes[mode] || {
        name: mode
      },
      readOnly: readonly,
      autoCloseBrackets: true,
      autoCloseTags: true,
      theme: 'material',
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment',
        'Ctrl-Q' (cm) {
          cm.foldCode(cm.getCursor());
        },
        'Cmd-Q' (cm) {
          cm.foldCode(cm.getCursor());
        }
      },
      direction: 'ltr',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    };

    editor = CodeMirror.fromTextArea(refs.editor, opts);

    editor.setSize('100%', height);

    editor.on('change', (instance) => {
      value = instance.getValue();
      dispatch('change', { value });
    });

    if (editor) editor.setValue(value || '');
  });

  export function updateValue(data) {
    value = data;
    if (editor) editor.setValue(value || '');
  }
</script>

<style>
  .code-editor {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>

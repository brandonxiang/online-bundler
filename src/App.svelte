<script type="ts">
	import CodeMirror from './components/CodeMirror/index.svelte';
	import { getExports } from './utils/parse';
	import { parse, x, print } from 'code-red';

	let result = ''

	let text1 = `module.exports = (a,b) => { return a+b; }`;

	let text2 = `module.exports = (a,b) => { return a-b; }`;

	let resultEditor; 

	$: {
		try {

			const code1 = parse(text1, {});
			const code2 = parse(text2, {});

			const expression1 = getExports(code1);
			const expression2 = getExports(code2);

			const exp = x`window.__pager_func = {onMount: ${expression1.right}, onUnmount: ${expression2.right}}`
			result = print(exp).code

			if(resultEditor ) {
				resultEditor.updateValue(result)
			}

		} catch (e) {
			console.error(e)
		}
	}

</script>

<main>
	<div class="left">
		<CodeMirror bind:value={text1} height={400}/>
		<CodeMirror bind:value={text2} height={400}/>
	</div>
  <div class="right">
		<CodeMirror bind:this={resultEditor} value={result} readonly={true} height={810}/>
	</div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		padding: 1em;
		margin: 0 auto;
		display: flex;
	}

	.left, .right {
		width: 50%;
	}

</style>
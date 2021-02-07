<script type="ts">
	import CodeInput from './components/CodeInput.svelte';
	import CodeOutput from './components/CodeOutput.svelte';
	import { getExports } from './utils/parse';
	import { parse, x, print } from 'code-red';

	let result = ''

	let text1 = `module.exports = (a,b) => { return a+b; }`;

	let text2 = `module.exports = (a,b) => { return a-b; }`;

	$: {
		try {

			const code1 = parse(text1, {});
			const code2 = parse(text2, {});

			const expression1 = getExports(code1);
			const expression2 = getExports(code2);

			const exp = x`window.__pager_func = {onMount: ${expression1.right}, onUnmount: ${expression2.right}}`
			result = print(exp).code
		} catch (e) {
			console.error(e)
		}
	}

</script>

<main>
	<div class="left">
		<CodeInput bind:value={text1} />
		<CodeInput bind:value={text2} />
	</div>
  <div class="right">
		<CodeOutput bind:value={result} />
	</div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		display: flex;
	}

	.left, .right {
		width: 50%;
	}

</style>
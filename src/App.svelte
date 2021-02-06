<script type="ts">
	import CodeInput from './components/CodeInput.svelte';
	import CodeOutput from './components/CodeOutput.svelte';
	import { parseExpressionAt, x, print } from 'code-red';

	let result = ''

	let text1 = `module.exports = (a,b) => { return a+b; }`;

	let text2 = `module.exports = (a,b) => { return a-b; }`;

	$: {
		try {

			const expression1 = parseExpressionAt(text1, 0, {});
			const expression2 = parseExpressionAt(text2, 0, {});
			console.log("expression1", expression1, "expression2", expression2);

			if(expression1.type === 'AssignmentExpression' && expression2.type === 'AssignmentExpression') {
				const exp = x`window.__pager_func = {onMount: ${expression1.right}, onUnmount: ${expression2.right}}`
				result = print(exp).code
			}
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
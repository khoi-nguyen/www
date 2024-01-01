import meta from './2-components.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Un premier exemple">
        <Jupyter lang="svelte">
          {dedent`
            <script>
              let count = 0
              function increaseCount() {
                count = count + 1
              }
            </script>

            <button on:click={increaseCount}>
              Count: {count}
            </button>
          `}
        </Jupyter>
      </Slide>
      <Slide title="Formulaires">
        <Jupyter lang="svelte">
          {dedent`
            <script>
              let password = ''
              let loggedIn = false
              function login() {
                if (password === 'secret') {
                  loggedIn = true
                }
              }
            </script>

            {#if !loggedIn}
              Password:
              <input type="password" bind:value={password} />
              <input type="submit" on:click={login} />
            {:else}
              <p>You've successfully logged in</p>
            {/if}
          `}
        </Jupyter>
      </Slide>
    </Slideshow>
  );
};

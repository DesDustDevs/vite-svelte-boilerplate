<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Login from "./lib/Login.svelte";
  import Register from "./lib/register.svelte";
  import Forget from "./lib/Forget.svelte";
  import Home from "./lib/Home.svelte";
  let path = location.pathname;
  let token = window.localStorage.getItem("accessToken");
  // if(token){

  // }
</script>

<main>
  {#if path === "/login"}
    <Login />
  {:else if path === "/"}
    <Register />
  {:else if token && path==="/home"}
    <Home />
  {:else if path === "/forget"}
    <Forget />
  {/if}
</main>

<style>
</style>
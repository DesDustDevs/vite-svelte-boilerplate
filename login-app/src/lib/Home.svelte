<script>
  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    console.log("removed token");
    history.pushState({}, "", "/login");
    window.location.reload();
  };
</script>

<main>
  <div class="header"><button on:click={handleLogout}>Logout</button></div>
  <h1>Hey there you are logged in successfully</h1>
</main>

<style>
  .header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100px;
    align-items: center;
  }
</style>

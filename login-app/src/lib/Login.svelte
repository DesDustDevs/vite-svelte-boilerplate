<script>
  let email = "";
  let password = "";
  let error = "";
  // let bearer = "";

  function navigateTo(path) {
    history.pushState({}, "", "/home");
    window.location.reload();
  }

  function handleEmailChange(e) {
    email = e.target.value;
  }
  function handlePasswordChange(event) {
    password = event.target.value;
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      error = "Please Enter a valid email or password";
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        window.localStorage.setItem("accessToken", accessToken);
        if (accessToken) {
          navigateTo("/home");
        }
        console.log("hittting hereee ");
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
      error = error;
    }
    email = "";
    password = "";
    error = "";
  }
  const handleForget = () => {
    history.pushState({}, "", "/forget");
    window.location.reload();
  };
</script>

<form on:submit={handleLogin}>
  <h1>Login</h1>
  <label for="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    bind:value={email}
    on:change={handleEmailChange}
    required
  />
  <label for="password">Password:</label>
  <input
    type="password"
    id="password"
    name="password"
    bind:value={password}
    on:change={handlePasswordChange}
    required
  />
  <button type="submit">Login</button>
  <div class="flexClass">
    <div>Don't remember your password,</div>
    <button class="btn" on:click={handleForget}>Forgot Password?</button>
  </div>
  <!-- <div className={classes.Forget}>
    Already have an Account?{" "}
    <button className={clas.btn} onClick={handleNavigate}> Sign In </button>
  </div> -->
  {#if error}
    <p style="color: red">{error}</p>
  {/if}
</form>

<style>
  .btn {
    background-color: transparent;
  }
  .flexClass {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 2rem;
  }
</style>

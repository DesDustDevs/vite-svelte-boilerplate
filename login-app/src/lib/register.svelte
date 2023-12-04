<script>
  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";

  function navigateTo(path) {
    history.pushState({}, "", "/login");
    window.location.reload();
  }

  function handleEmailChange(event) {
    email = event.target.value;
    console.log("email", email);
  }

  function handlePasswordChange(event) {
    password = event.target.value;
  }

  function handleConfirmPasswordChange(event) {
    confirmPassword = event.target.value;
  }

  const handleLoginRedirect = () => {
    navigateTo("/login");
  };

  async function handleRegister(event) {
    event.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") {
      error = "Please enter the entire information";
      return error;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        navigateTo("");
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
      error = "Please enter the correct information";
    }
  }
</script>

<form on:submit={handleRegister}>
  <h1>Register</h1>
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

  <label for="confirmPassword">Confirm Password:</label>

  <input
    type="password"
    id="confirmPassword"
    name="confirmPassword"
    bind:value={confirmPassword}
    on:change={handleConfirmPasswordChange}
    required
  />
  <div class="flexClass">
    <div>Already have an account</div>
    <button class="btn" on:click={handleLoginRedirect}>Login</button>
  </div>
  <button type="submit">Register</button>
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

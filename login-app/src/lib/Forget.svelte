<script>
  let email = "";
  let error = "";
  const handleEmailChange = (e) => {
    email = e.target.value;
  };

  function navigateTo(path) {
    history.pushState({}, "", "/login");
    window.location.reload();
  }
  async function handleForget(event) {
    event.preventDefault();

    if (email === "") {
      error = "Please Enter a valid email or password";
      console.log("please Enter a valid email");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("hittting hereee ", data.tempPassword);
        navigateTo("/login");
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    email = "";
  }
</script>

<main>
  <h2>Don't worry enter you email to reset your password</h2>
  <label for="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    bind:value={email}
    on:click={handleEmailChange}
    required
  />
  <button on:click={handleForget}>Submit</button>
</main>

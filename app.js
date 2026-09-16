(async () => {
  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");

  const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const form = document.getElementById("migrationForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    message.textContent = "Submitting application...";

    const formData = new FormData(form);

    const application = {
      in_game_name: formData.get("in_game_name"),
      user_id: formData.get("user_id"),
      current_clan: formData.get("current_clan"),
      current_state: Number(formData.get("current_state")),
      preferred_clan: formData.get("preferred_clan"),
      backup_clan: formData.get("backup_clan") || null,
      total_power: formData.get("total_power"),
      first_march_power: formData.get("first_march_power"),
      second_march_power: formData.get("second_march_power") || null
    };

    try {
      const { error } = await client
        .from("migration_applications")
        .insert([application]);

      if (error) {
        console.error(error);
        message.textContent = "Application failed: " + error.message;
        return;
      }

      message.textContent = "Application submitted successfully!";
      form.reset();

    } catch (error) {
      console.error(error);
      message.textContent = "Application failed: " + error.message;
    }
  });
})();

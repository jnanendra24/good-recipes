export const loginUser = async (existingUser) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(existingUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok) {
      throw new Error('Invalid credentials');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (newUser) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok) {
      throw new Error('User already exists');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

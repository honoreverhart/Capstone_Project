const {
    client,
    createTables,
    createUser,
    fetchUser,
    createWorkout,
    fetchWorkout,
    destroyWorkout,
    assignWorkout,
    authenticate,
    findUserWithToken
  } = require("./db");
  
  await client.connect();
  console.log("connected to database");
  
  await createTables();
  console.log("tables created");

//   const [moe, lucy, ethyl, curly, foo, bar, bazz, quq, fip] = await Promise.all([
//     createUser({ username: "moe", password: "m_pw" }),
//     createUser({ username: "lucy", password: "l_pw" }),
//     createUser({ username: "ethyl", password: "e_pw" }),
//     createUser({ username: "curly", password: "c_pw" }),
//     createProduct({ name: "foo" }),
//     createProduct({ name: "bar" }),
//     createProduct({ name: "bazz" }),
//     createProduct({ name: "quq" }),
//     createProduct({ name: "fip" }),
//   ]);
  
//   console.log(await fetchUsers());
//   console.log(await fetchProducts());
  
//   console.log(await fetchFavorites(moe.id));
//   const favorite = await createFavorite({ user_id: moe.id, product_id: foo.id });
  
// resolvers.js
const resolvers = {
  Query: {
    //working correct
    users: async (_, __, { pool }) => {
      const [rows] = await pool.query("SELECT * FROM User_table");
      return rows.map((row) => ({
        id: row.ID,
        name: row.name,
        email: row.email,
      }));
    },
    user: async (_, { id }, { pool }) => {
      const [rows] = await pool.query("SELECT * FROM User_table WHERE id=?", [
        id,
      ]);
      return rows[0];
    },
    todos: async (_, __, { pool }) => {
      const [rows] = await pool.query("SELECT * FROM Todo_table");
      return rows.map((row) => ({
        id: row.ID,
        title: row.title,
        iscompleted: row.iscompleted,
        user_id: row.user_id,
      }));
    },
    todo: async (_, { id }, { pool }) => {
      const [rows] = await pool.query("SELECT * FROM Todo_table WHERE id=?", [
        id
      ]);
      
      return {...rows[0],id:id};
    },
    todoListbyUserId:async(_,{user_id},{pool}) =>{
        const [rows] = await pool.query("SELECT * FROM Todo_table WHERE user_id=?",[user_id]);

        return rows.map((row) => ({
            id: row.ID,
            title: row.title,
            iscompleted: row.iscompleted,
            user_id: row.user_id,
          }));
    }
  },
  Mutation: {
    addUser: async (_, { name, email }, { pool }) => {
      // const { title, platform } = game;
      // const platformStr = platform.join(', ');
      try {
        const [result] = await pool.query(
          "INSERT INTO User_table (name, email) VALUES (?, ?)",
          [name, email]
        );
        return { id: result.insertId, name, email };
      } catch (err) {
        throw new Error(`Failed to add game: ${err.message}`);
      }
    },
    deleteUser: async (_, { id }, { pool }) => {
      await pool.query("DELETE FROM User_table WHERE id=?", [id]);
      const [rows] = await pool.query("SELECT * FROM User_table");
      return rows.map((row) => ({
        id: row.ID,
        name: row.name,
        email: row.email,
      }));
    },

    addTodo: async (_, { title, iscompleted, user_id }, { pool }) => {
      // const { title, platform } = game;
      // const platformStr = platform.join(', ');
      try {
        const [result] = await pool.query(
          "INSERT INTO Todo_table (title, iscompleted,user_id) VALUES (?, ?, ?)",
          [title, iscompleted, user_id]
        );
        return { id: result.insertId, title, iscompleted, user_id };
      } catch (err) {
        throw new Error(`Failed to add game: ${err.message}`);
      }
    },
    updateTodo:async (_, { id, title,iscompleted }, { pool }) => {
        await pool.query('UPDATE Todo_table SET title = ?, iscompleted = ? WHERE ID = ?', [title, iscompleted, id]);
        const [rows] = await pool.query('SELECT * FROM Todo_table WHERE ID = ?', [id]);
        
        return {...rows[0],id:id}; 
      },
  },
};

export default resolvers;

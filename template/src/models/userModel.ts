import { DataTypes, Model, Optional } from "sequelize";
import database from "../config/database"; 


interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}


interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100], 
      },
    },
  },
  {
    database,
    modelName: "User", 
    tableName: "users",
    timestamps: true, 
  }
);

User.addHook("beforeCreate", async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;

import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../db";

export const createUser = async (req: Request, res: Response) => {
    const { firstname, lastname } = req.body
    try {
        // throw new Error("Error");

        const user = new User()
        user.firstname = firstname
        user.lastname = lastname
        await user.save()
        console.log(user);
        res.json(user)

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
}

export const getUsers = async (req: Request, res: Response) => {

    // const savedUsers = await AppDataSource.manager.find(User)
    // console.log("All users from the db: ", savedUsers)
    try {

        const savedUsers = await User.find()
        return res.json(savedUsers)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    // const { firstname, lastname } = req.body
    const { id } = req.params
    const user = await User.findOneBy({
        id: parseInt(req.params.id)
    })

    if (!user) return res.status(404).json({ message: "User does not exist" })
    // user.firstname = firstname
    // user.lastname = lastname
    // user.save()

    User.update({ id: parseInt(id) }, req.body)
    console.log(user);

    res.sendStatus(204)

}

export const deleteUser = async (req: Request, res: Response) => {
    
    try {
      const { id } = req.params
    const result = await User.delete({ id: parseInt(id) })

    if (result.affected === 0) {
        return res.status(404).json({ message: "User not found" })
    }
    console.log(result);

    return res.sendStatus(204)
  } catch (error) {
    if(error instanceof Error)
    return res.status(504).json({ message: error.message })
    
  }
}


export const getUser = async (req: Request, res: Response) => {
    
    try {
      const { id } = req.params
    const user = await User.findOneBy({ id: parseInt(id) })

    return res.json(user)
  } catch (error) {
    if(error instanceof Error)
    return res.status(500).json({ message: error.message })
    
  }
}
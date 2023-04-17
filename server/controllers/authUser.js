import generateToken from '../config/generateToken.js'
import User from '../models/User.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    const user = await User.create({ name, email, password })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid User data')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      })
    } else {
      res.status(401)
      throw new Error('Invalid Username or Password')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User profile not updated')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}


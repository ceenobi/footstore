import axios from 'axios'
export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ceenobi/image/upload'
export const CLOUDINARY_UPLOAD_PRESET = 'xis4sesf'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})


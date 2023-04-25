const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

const PartnerImage = require("../models/partnerImages");
const customErrors = require("../utils/customError.js");
const admin = require("../FirebaseInitialization")
const bucket = admin.storage().bucket();

exports.POST_IMAGE = async (req, res, next) => {
  try {
    const file = req.file;

    const fileUpload = bucket.file(file.originalname);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      throw error;
    });

    stream.on('finish', async () => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;

      const newImg = new PartnerImage({
        image: imageUrl,
      });

      const savedImg = await newImg.save();

      if (!savedImg) {
        throw new customErrors('Failed to read the file', 400);
      }

      res.status(200).json({
        status: 'success',
        data: savedImg,
      });
    });

    stream.end(file.buffer);
  } catch (error) {
    return next(error);
  }
};

exports.GET_IMAGES = async (req, res, next) => {
    try {
      const images = await PartnerImage.find({}, { _id: 0, image: 1 });
  
      const imageUrls = images.map((image) => image.image);
  
      res.status(200).json({
        status: 'success',
        data: imageUrls,
      });
    } catch (error) {
      return next(error);
    }
  };


exports.DELETE_IMAGE = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const image = await PartnerImage.findOneAndDelete({ _id });

    if (!image) {
      throw new customErrors('Image not found', 404);
    }

    const imageUrl = image.image;

    const file = bucket.file(imageUrl);

    await file.delete();

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
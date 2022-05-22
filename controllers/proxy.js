import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import Proxy from '../models/proxy.js';

import {
  validateAddProxy
} from '../validations/proxy.js';

import {
  proxySuccessResponse,
} from '../response_models/proxy.js';
import {exec} from 'child_process'; 
import fs from 'fs';



// @desc  Add Proxy
// @route  POST /api/proxy
// @access Public

const addProxy = asyncHandler(async (req, res) => {
  try {
    const validation = validateAddProxy(req.body);
    const { error } = validation;
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const proxy = new Proxy({
      proxy_name: req.body.proxy_name,
      ip: req.body.ip,
      port: req.body.port,
      bandwidth : req.body.bandwidth,
      email: req.body.email.toLowerCase(),
      time: req.body.time,
      user_id: req.body.user_id,
      status:1,
      file_url: `${req.body.port}.list.txt`,
    });

    const newProxy = await proxy.save();
    if (newProxy) {
      const create_file_command = "echo "+req.body.proxy_name+" > proxy/"+req.body.port+".list.txt"
      exec(create_file_command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
      res.status(201).send(proxySuccessResponse(newProxy));
    } else {
      res.status(500);
      throw new Error('Invalid proxy data');
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(
      `An error occurred during processing the request. More details: ${error}`
    );
  }
});



// @desc   Delete proxy profile
// @route  DELETE /api/proxy/:id
// @access Private/Admin

const deleteProxy = asyncHandler(async (req, res) => {
  
  try {
    const id = req.params.id;
    console.log("id",id);
    const proxy = await Proxy.findByIdAndDelete({_id:id});
    if (proxy) {
      res.status(200).send({ message: 'Proxy successfully deleted.' });
    }else{
      res.status(500).send({ message: req });
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to delete proxy due to this following errors: ${error}`
    );
  }
});

// @desc   Get proxy List
// @route  GET /api/proxy
// @access Private/Admin

const getProxy = asyncHandler(async (req, res) => {
  try {
    
    let proxy = await Proxy.find({}).sort({ created: -1 });
    if (proxy) {
      res.status(200).send({ proxy });
    } else {
      res.status(500);
      throw new Error(
        `Internal Server Error. Unable to retrieve proxy. Please try again later.`
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to retrieve proxy due to this following errors: ${error}`
    );
  }
});


const changeStatusOfProxy = asyncHandler(async (req, res) => {
  try {
      let status = 1 
      if(req.body.status == 2){
        status = 3;
      }else if(req.body.status == 3) {
        status = 2;
      }else{
        status = 2;
      }
      const proxy = Proxy.findByIdAndUpdate(req.body.id, {
          status: status,
      })
      .then(proxy => {
          if(!proxy) {
              return res.status(500).send({
                  message: "Proxy not found."
              });
          }
          if(req.body.status == 2){
            const create_file_command = "echo 'Hello'"
            exec(create_file_command, (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                  return;
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  return;
              }
              console.log(`stdout: ${stdout}`);
            });
          }
          if(req.body.status == 3){
            const create_file_command = "echo 'Hello'"
            exec(create_file_command, (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                  return;
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  return;
              }
              console.log(`stdout: ${stdout}`);
            });
          }
          
          res.status(201).send({ message: 'Proxy Status has been successfully changed.' });
      }).catch(error => {
        res.status(500);
        throw new Error(
          `Internal Server Error. Unable to retrieve users due to this following errors: ${error}`
        );
      });
} catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to delete user due to this following errors: ${error}`
    );
  }
});

const downloadProxyFile = asyncHandler(async (req, res) => {
  try {
    const file = "./proxy/"+req.params.url;
    if (fs.existsSync(file)) {
      res.download(file); // Set disposition and send it.
    }else{
      res.status(500);
        throw new Error(
          `Internal Server Error. Unable to retrieve users due to this following errors: file not found`
        );
    }
} catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to delete user due to this following errors: ${error}`
    );
  }
});

export {
  deleteProxy,
  addProxy,
  getProxy,
  changeStatusOfProxy,
  downloadProxyFile,
};

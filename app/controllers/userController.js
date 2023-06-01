
const Candidate = require('../models/Candidate.model');
const common = require('./commonController');
const catchAsync = require('./../utils/catchAsync');


exports.test = catchAsync(async (req, res, next) => {
  console.log('req.body-------->', req.body)
  const dd = await Candidate.create(req.body);
  console.log('dd-------->', dd)
  res.status(200).send({
    status: "success"
  });
});


exports.addCandidates = catchAsync(async (req, res, next) => {
  const data = await common.createOne(Candidate, req.body);
  res.status(200).send({
    status: "success",
    data
  });
});

exports.getCandidates = catchAsync(async (req, res, next) => {
  let limit = Number(req.body.limit);
  let offset = Number(req.body.offset);
  let total_records = 0;
  let doc = await common.getCandidates(Candidate, { limit: Number(limit), offset: Number(offset) });
  if (doc && doc.length != 0 && doc[0].data.length != 0) {
    total_records = doc[0].pagination[0].total_records;
  }
  res.status(200).send({
    status: "success",
    doc,
    total_records
  });
});

exports.getCandidate = catchAsync(async (req, res, next) => {
  const candidateId = req?.query?.id || req?.body?.id || req?.params?.id
  let candidate = await common.findByID(Candidate,candidateId);
  res.status(200).send({
    status: "success",
    candidate
  });
});

exports.updateCandidate = catchAsync(async (req, res, next) => {
  const candidateId = req?.query?.id || req?.body?.id || req?.params?.id
  let candidate = await common.findByIdAndUpdate(Candidate,candidateId,req.body);
  res.status(200).send({
    status: "success",
    candidate
  });
});


let dataStorage = [];

// Retrieve all data
const getAllData = (request, response) => {
    response.json(dataStorage)
};

// Add new data
const createData = (request, response) => {
    const newData = request.body;
    dataStorage.push(newData);
    response.status(201).json(newData);
};

// Get certain data by user id
const getDataById = (request, response) => {
    const id = parseInt(request.params.userId);
    const data = dataStorage.find((item) => item.classificationId === id);

    if(!data) {
        return response.status(404).json({error: 'Data not found'});
    }
    
    response.json(data);
}

// Update data by user id
const updateData = (request, response) => {
    const id = parseInt(req.params.userId);
    const existingData = dataStorage.find((item) => item.classificationId === id);
  
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    const updatedData = {
    ...existingData,
    ...request.body,
    };

    dataStorage = dataStorage.map((item) =>
    item.classificationId === id ? updatedData : item
    );

    response.json(updatedData);
}

// Remove data by user id
const removeData = (request, response) => {
    const id = parseInt(request.params.userId);
    dataStorage = dataStorage.filter((item) => item.classificationId !== id);
    response.json({message: 'Data has been deleted'})
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    removeData,
}


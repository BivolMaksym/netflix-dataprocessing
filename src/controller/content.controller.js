let contentStorage = [];

// Retrieve all content
const getAllContent = (request, response) => {
    response.json(contentStorage)
};

// Add new content
const addNewContent = (request, response) => {
    const newContent = request.body;
    contentStorage.push(newContent);
    response.status(201).json(newContent);
};

// Update content
const updateContent = (request, response) => {
    // const id = parseInt(req.params.userId);
    const existingContent = contentStorage.find((item) => item.contentId === id);
  
    if (!existingContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const updatedContent = {
    ...existingContent,
    ...request.body,
    };

    contentStorage = contentStorage.map((item) =>
    item.contentId === id ? updatedContent : item
    );

    response.json(updatedContent);
}

// Remove content by user id
const removeAllContent = (request, response) => {
    // const id = parseInt(request.params.userId);
    contentStorage = contentStorage.filter((item) => item.contentId !== id);
    response.json({message: 'Data has been deleted'})
};

module.exports = {
    getAllContent,
    addNewContent,
    updateContent,
    removeAllContent,
}


const { Router } = require('express');

const upload = require('../middlewares/upload.mw');
const GroupController = require('../controllers/group.controller');
const groupRouter = Router();

groupRouter.post('/', upload.single('image'), GroupController.createGroup);
groupRouter.get('/users/:idUser', GroupController.getUserGroups);

groupRouter.get('/:idGroup/users', GroupController.getGroupUsers);

groupRouter.patch('/:idGroup', GroupController.addUserAtGroup);

groupRouter.put('/:idGroup', upload.single('image'), GroupController.updateGroup);

groupRouter.delete('/:idGroup', GroupController.deleteGroup);
groupRouter.get('/:idGroup', GroupController.countUsers);
groupRouter.patch('/:idGroup/image', GroupController.addImage);

module.exports = groupRouter;

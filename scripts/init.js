// Set up socket listener to listen for exploration activities macro
import { explorationActivity } from './scripts.js'

Hooks.once('ready', () => {
  console.log('PF2e Exploration Activities | Hooked in')
  game.socket.on('module.pf2e-exploration-activities', async (socketData) => {
    if (socketData.operation === 'playerExplorationActivity') {
      console.log('socketData: ', socketData)
      
      // Retrieve the actor from UUID
      const actor = await fromUuid(socketData.actorUuid)
      
      if (!actor) {
        console.error('PF2e Exploration Activities | Actor not found:', socketData.actorUuid)
        return
      }
      
      // Check if the current user owns this actor (permission level 3 = OWNER)
      if (actor.ownership[game.user.id] >= CONST.DOCUMENT_PERMISSION_LEVELS.OWNER) {
        explorationActivity(actor, socketData.tokenID)
      }
    }
  })
})
RegisterServerEvent('basic_hud:syncCarLights')
AddEventHandler('basic_hud:syncCarLights', function(status)
	TriggerClientEvent('basic_hud:syncCarLights', -1, source, status)
end)
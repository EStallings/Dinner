#pragma strict

var flags = {
	'gunLoaded':false,
	'chandelierLoose':false,
	'wineSpilled':false,
	'colonelDrunk':false,
	'brandyServed':false
};
var player = Player;

var screwController : CharacterController;

var chanObject : GameObject;


private var lightningAudioSource : AudioSource;
var lightningAudioClip           : AudioClip;

function Start () {
	lightningAudioSource = gameObject.AddComponent("AudioSource");
	lightningAudioSource.clip = lightningAudioClip;
}

function Update () {
	if (Random.value < 0.0005) {
		lightningAudioSource.Play();
		print("LIGHTNING!");
	}
}

function DoTriggerAction (trigger) {
	print(trigger);
	switch (trigger) {
		case 'loadGun':
			flags['gunLoaded'] = true;
			break;
		case 'loosenChandelier':
			flags['chandelierLoose'] = true;
			var chanAnim : AnimController = chanObject.GetComponent("AnimController");
			charAnim.Trigger();
			break;
		case 'serveBrandy':
			flags['brandyServed'] = true;
			break;
		case 'spillWine':
			flags['wineSpilled'] = true;
			break;
		case 'shootChandelier':

			break;
		case '':
			break;
		case '':
			break;
		case '':
			break;
		case '':
			break;
		default:
			print("trigger not found");
			break;
	}
}
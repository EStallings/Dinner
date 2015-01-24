#pragma strict

var flags = {};
var guests = {};
var conspirators = {};
var player = Player;

private var lightningAudioSource : AudioSource;
var lightningAudioClip   : AudioClip;

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
}
#pragma strict

var controller : GameStatusController;

var label : String;
var activator : NodActivatee = null;

var becomeInactiveWhenFinished : boolean = false;
var waypoints : Transform[];
var lookpoints: Transform[];
var times     : int[];
var anims     : String[]; //todo: make this some kind of asset type
var sounds    : AudioClip[];
var soundsDontLoop: boolean[];
var triggers  : String[];
var synchWith : GameObject;
var suppressInitialStuff : boolean;
var animScheduler  : CharacterAnimScheduler;

var randomTalkSound : boolean[];
var randomTalkGenerator : RandomTalk;

var walkAnim  = 'walk';
var walkSound : AudioClip;

var currentController = false;

private var isCarryingObject : boolean        = false;
private var silenced         : boolean        = false;
private var isWalking        : boolean        = false;
private var curTimer         : int            = -1;
 var curWaypoint      : Transform      = null;
 var curLookPoint     : Transform      = null;
private var lastWaypoint     : Transform      = null;
private var curIndex         : int            = 0;
private var curAnimation     : String         = null;
private var curSound         : AudioClip      = null;

var speed = 0.1;
private var startTime: float;
private var journeyLength: float;

var target : Transform;
var smooth = 5.0;

private var asource : AudioSource;

function Start () {
	asource = gameObject.AddComponent("AudioSource");
	asource.loop = true; //just, always loop everything
	curWaypoint = waypoints[0];
	curLookPoint = lookpoints[0];
	curTimer = times[0];

	// print(transform.position);
	if(!suppressInitialStuff) {
		StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
		currentController = true;
	}
}

public function Trigger() {
	if (activator != null)
		activator.disabled = true;
	controller.RequestLock(this, false);
}

public function RealTrigger(){
	// print(label + "Triggered!");
	curTimer = 0;
	silenced = false;
	if(!currentController) {
		StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
		currentController = true;
	}
	if(synchWith != null) {
		var pair : MyCharacterController = synchWith.GetComponent("MyCharacterController");
		pair.SilentTrigger();
	}
}

public function TriggerHighPriority(){
	controller.RequestLock(this, true);
}

public function SilentTrigger(){
	//print("Triggered!");
	curTimer = 0;
	silenced = true;
}

function StartAnimAndSoundLoops(anim, sound) {
	// print("Starting anim and sound on loop!");
	//End current animations and sounds

	if(curSound != null){
		//End sound
		asource.Stop();
		//print("Stopping : " + curSound);
	}
	print("curAnimation: " + curAnimation + " next: " + anim);
	var lastSound = curSound;
	var lastAnimation= curAnimation;
	curAnimation = anim;
	curSound = sound;
	//Start current animations and sounds
	if(curAnimation != '' && curAnimation != lastAnimation){
		//Start animation
		if(animScheduler){
			print("Starting animation " + curAnimation + " from " + label);
			animScheduler.SetAnimation(curAnimation);
		}
	}
	if(curSound != null && curSound != lastSound){
		//Start sound
		print("Starting soundeffect " + curSound + " from " + label);
		asource.clip = curSound;
		asource.loop = !soundsDontLoop[curIndex];
		asource.Play();
		//print("Playing : " + curSound);
	}
}

function Update () {
	if(!currentController){
		print(label + " is not current controller; exiting");
		if(asource.isPlaying){
			asource.Stop();
		}
		return;
	}
	if (curLookPoint != null) {
		var damping : int = 2;
		var lookPos = curLookPoint.position - transform.position;
		lookPos.y = 0;
		var rotation = Quaternion.LookRotation(lookPos);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
	}
	if (isWalking){
		MoveTowardsWaypoint(curWaypoint);
	}
	else {
		if(curTimer > 0) {
			curTimer --;
		}
		if(curTimer == 0) {
			if(triggers[curIndex] != 0){
				controller.DoTriggerAction(triggers[curIndex]);
			}
			curIndex ++;
			print("from: " + label + " index = " + curIndex + " with anim " + anims[curIndex] + " and time " + times[curIndex]);
			lastWaypoint = curWaypoint;
			curWaypoint  = waypoints[curIndex];
			curLookPoint = lookpoints[curIndex];

			if(!IsCloseToDestination()){
				isWalking = true;
				StartAnimAndSoundLoops(walkAnim, walkSound);
				startTime = Time.time;
				journeyLength = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
			}
			else {
				curTimer = times[curIndex];
				StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
				if(curTimer < 0){
					if(!silenced) {
						if(becomeInactiveWhenFinished){
							this.currentController = false;
						}
						controller.Unlock();
					}
				}
			}
		}
	}
}

function IsCloseToDestination() {
	var distance = Vector3.Distance(lastWaypoint.position, curWaypoint.position);
	print("Distance = " + distance);
	if(distance > 0.5) return false;
	return true;
}

function MoveTowardsWaypoint(waypoint) {
	var distCovered = (Time.time - startTime) * speed;
	var fracJourney = distCovered / journeyLength;
	// print("FracJourney " + fracJourney);
	transform.position = Vector3.Lerp(lastWaypoint.position, curWaypoint.position, fracJourney);
	if (fracJourney >= 1){
		isWalking = false;
		curTimer = times[curIndex];
		print("What?");
		StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
			if(curTimer < 0){
				if(!silenced) {
					if(becomeInactiveWhenFinished){
						this.currentController = false;
					}
					controller.Unlock();
				}
			
			//print("Finishing!");
		}
		//print("Stopping");
	}
}
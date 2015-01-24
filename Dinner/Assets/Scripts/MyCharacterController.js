#pragma strict

var controller : GameStatusController;

var waypoints : Transform[];
var times     : int[];
var anims     : GameObject[]; //todo: make this some kind of asset type
var animStop  : GameObject;
var sounds    : AudioClip[];
var triggers  : String[];
var suppressInitialStuff : boolean;
var synchWith : GameObject;

var walkAnim  = null;
var walkSound = null;

private var isCarryingObject : boolean        = false;
private var silenced         : boolean        = false;
private var isWalking        : boolean        = false;
private var curTimer         : int            = -1;
private var curWaypoint      : Transform      = null;
private var lastWaypoint     : Transform      = null;
private var curIndex         : int            = 0;
private var curAnimation     : GameObject     = null;
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
	curTimer = times[0];
	// print(transform.position);
	if(!suppressInitialStuff) {
		StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
	}
}

public function Trigger() {
	controller.RequestLock(this, false);
}

public function RealTrigger(){
	print("Triggered!");
	curTimer = 0;
	silenced = false;
	if(synchWith != null) {
		var pair : MyCharacterController = synchWith.GetComponent("MyCharacterController");
		pair.SilentTrigger();
	}
}

public function TriggerHighPriority(){
	controller.RequestLock(this, true);
}

public function SilentTrigger(){
	print("Triggered!");
	curTimer = 0;
	silenced = true;
}

function StartAnimAndSoundLoops(anim, sound) {
	// print("Starting anim and sound on loop!");
	//End current animations and sounds
	if(curAnimation != null){
		//End animation
		var canim1 : AnimController = animStop.GetComponent("AnimController");
		canim1.Trigger();

	}
	if(curSound != null){
		//End sound
		asource.Stop();
		print("Stopping : " + curSound);
	}
	curAnimation = anim;
	curSound = sound;
	//Start current animations and sounds
	if(curAnimation != null){
		//Start animation
		var canim2 : AnimController = curAnimation.GetComponent("AnimController");
		canim2.Trigger();
	}
	if(curSound != null){
		//Start sound
		asource.clip = curSound;
		asource.Play();
		print("Playing : " + curSound);
	}
}

function Update () {
	if (isWalking){
		MoveTowardsWaypoint(curWaypoint);
	}
	else {

		if(curTimer > 0) curTimer --;
		if(curTimer == 0) {
			print("Progressing : " + (curIndex + 1));
			if(triggers[curIndex] != 0){
				controller.DoTriggerAction(triggers[curIndex]);
			}
			curIndex ++;
			lastWaypoint = curWaypoint;
			curWaypoint = waypoints[curIndex];

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
						controller.Unlock();
					}
					print("Finishing!");
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
		StartAnimAndSoundLoops(anims[curIndex], sounds[curIndex]);
		if(curTimer < 0){
			if(!silenced) {
				controller.Unlock();
			}
			print("Finishing!");
		}
  	//print("Stopping");
  }
}
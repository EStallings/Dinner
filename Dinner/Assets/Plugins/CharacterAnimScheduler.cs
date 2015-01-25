using UnityEngine;
using System.Collections;

public class CharacterAnimScheduler : MonoBehaviour {
	public AnimController SitController;
	public AnimController WalkController;
	public AnimController BendOverController;
	public AnimController GetBusyController;
	public AnimController CarryingController;
	public AnimController TorsoWalkController;
	public AnimController KnockOverGlassController;
	public AnimController AnimationResetController;
	public AnimController FreakOutController;
	public AnimController DrinkController;
	public AnimController ShootCeilingController;

	private float time = 0.0f;
	private string animType = "sit";
	private int phase = 0;
	private bool resetLock = false;
	// Use this for initialization
	void Start () {
		SetAnimation("sit");
	}

	public void SetAnimation(string anim) {
		animType = anim;
		// print("Starting new animation with " + time + " on previous clock");
		time = 0.0f;
		phase = 0;
		resetLock = true;
		ResetState();
	}

	public void AnimCallback() {
		resetLock = false;
		AnimationResetController.End();
	}
	
	void Update () {
		if (resetLock){
			return;
		}

		switch (animType) {
		case "sit":
			if (time == 0.0) {
				SitController.Trigger();
			}
			break;
		case "walk":
			if (time == 0.0) {
				WalkController.Trigger();
			}
			break;
		case "getBusyHigh":
			if (time == 0.0) {
				FreakOutController.Trigger();
			}
			if (time > 0.25 && phase == 0) {
				phase = 1;
				FreakOutController.End();
				GetBusyController.Trigger();
			}
			break;
		case "getBusyLow":
			if (time == 0.0) {
				BendOverController.Trigger();
			}
			if (time > 0.25 && phase == 0) {
				phase = 1;
				BendOverController.End();
				GetBusyController.Trigger();
			}
			break;
		case "shootCeiling":
			if (time == 0.0) {
				GetBusyController.Trigger();
			}
			if (time > 3 && phase == 0) {
				phase = 1;
				GetBusyController.End();
				ShootCeilingController.Trigger();
			}
			break;

		//TO TEST
		case "drinkBrandy":
			if (time == 0.0) {
				SitController.Trigger();
				DrinkController.Trigger();
			}
			break;
		case "freakOut":
			if (time == 0.0) {
				TorsoWalkController.Trigger();
				FreakOutController.Trigger();
			}
			break;
		case "knockOverGlass":
			if (time == 0.0) {
				SitController.Trigger();
				KnockOverGlassController.Trigger();
			}
			break;

			///TODO

		case "carryWalk":
			if (time == 0.0) {
				TorsoWalkController.Trigger();
				CarryingController.Trigger();
			}
			break;
		case "carrySit":
			if (time == 0.0) {
				SitController.Trigger();
				CarryingController.Trigger();
			}
			break;
		
		default:
			print("Attempted to switch to animation : " + animType + ", which does not exist!");
			break;

		}
		time+= Time.deltaTime;
	}
	
	public void ResetState() {

		SitController.End();
		WalkController.End();
		BendOverController.End();
		GetBusyController.End();
		CarryingController.End();
		TorsoWalkController.End();
		KnockOverGlassController.End();
		FreakOutController.End();
		DrinkController.End();
		ShootCeilingController.End();
		AnimationResetController.Trigger(this);
	}
	
}

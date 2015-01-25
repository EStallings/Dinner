using UnityEngine;
using System.Collections;

public class CharacterDriver : MonoBehaviour {
	public AnimController WalkController;
	public AnimController SitController;
	public AnimController BendOverController;
	public AnimController GetBusyController;
	public AnimController CarryingController;
	public AnimController TorsoWalkController;
	public AnimController KnockOverGlassController;
	public AnimController AnimationResetController;
	public AnimController FreakOutController;
	public AnimController DrinkController;
	public AnimController ShootCeilingController;

	private float i;

	// Use this for initialization
	void Start () {
		i = 0.0f;
	}
	
	// Update is called once per frame
	void Update () {
		RunBehavior(Mathf.RoundToInt(i)%8);
		i += Time.deltaTime/2;
	}

	public void RunBehavior(int argument){
		//Walk
		if (argument == 0){
			ResetState();
			AnimationResetController.Trigger();
			WalkController.Trigger();
		}
		//Sit / Idle
		if (argument == 1){
			ResetState();
			AnimationResetController.Trigger();
			SitController.Trigger();
		}
		//Busy
		if (argument == 2){
			ResetState();
			AnimationResetController.Trigger();
			BendOverController.Trigger();
			yield WaitForSeconds(0.5f);
			ResetState();
			GetBusyController.Trigger();

		}
		//Carry & Idle
		if (argument == 3){
			ResetState();
			AnimationResetController.Trigger();
			CarryingController.Trigger();
		}
		//Carry & Walk
		if (argument == 4){
			ResetState();
			AnimationResetController.Trigger();
			TorsoWalkController.Trigger();
			CarryingController.Trigger();
		}
		//Freak Out
		if (argument == 5){
			ResetState();
			AnimationResetController.Trigger();
			FreakOutController.Trigger();
		}
		//Knock Over Glass
		if (argument == 6){
			ResetState();
			AnimationResetController.Trigger();
			GetBusyController.Trigger();
			KnockOverGlassController.Trigger();
		}
		//Drink
		if (argument == 7){
			ResetState();
			AnimationResetController.Trigger();
			DrinkController.Trigger();
		}
		//Shoot Ceiling
		if (argument == 8){
			ResetState();
			AnimationResetController.Trigger();
			ShootCeilingController.Trigger();
		}


	}

	public void ResetState(){
		WalkController.End();
		SitController.End();
		BendOverController.End();
		GetBusyController.End();
		CarryingController.End();
		TorsoWalkController.End();
		KnockOverGlassController.End();
		FreakOutController.End();
		DrinkController.End();
		ShootCeilingController.End();
	}

	IEnumerator MyMethod() {
		yield return new WaitForSeconds(0.5f);
	}


}

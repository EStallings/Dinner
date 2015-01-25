using UnityEngine;
using System.Collections;

public class CharacterAnimScheduler : MonoBehaviour {
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
	private float time;
	
	// Use this for initialization
	void Start () {
		time = 0;
	}
	

	void Update () {
	
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
	
}

using UnityEngine;
using System.Collections;

public class LimbResetter : MonoBehaviour {
	public bool active;
	private Quaternion animtarget;

	// Use this for initialization
	void Start () {
		animtarget = transform.localRotation;
	}

	public void ResetTrigger(){
		transform.rotation = animtarget;
	}
	
	// Update is called once per frame
	void Update () {

	}
}

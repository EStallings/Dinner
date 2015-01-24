using UnityEngine;
using System.Collections;

public class PropPointer : MonoBehaviour {
	public bool active;
	public Vector3 target;
	public float speed;

	private Quaternion temp;
	private Quaternion targ;

	// Use this for initialization
	void Start () {

	}
	
	public void PointerTrigger(){
		active = !active;
	}
	
	// Update is called once per frame
	void Update () {
		if(active){
			temp = transform.rotation;
			transform.LookAt(target);
			targ = transform.rotation;
			transform.rotation = temp;
			transform.rotation = Quaternion.Lerp(transform.rotation, targ, speed);
		}
	}
}
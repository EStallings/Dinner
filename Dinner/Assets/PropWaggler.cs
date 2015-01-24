using UnityEngine;
using System.Collections;

public class PropWaggler : MonoBehaviour {
	public Vector3 offset;
	public float speed;
	private Vector3 start;
	private Vector3 end;
	private Vector3 current;
	public bool activestate;
	private bool direction;

	// Use this for initialization
	void Start () {
		direction = false;
		start = transform.localRotation.eulerAngles;
		end = transform.localRotation.eulerAngles + offset;

	
	}

	void Trigger(){
		activestate = !activestate;
	}
	
	// Update is called once per frame
	void Update () {
		if(activestate){
			current = transform.localRotation.eulerAngles;
			if (Vector3.Distance(current, end) <= 0.1f && direction == false ){
				direction = true;
			}
			if (Vector3.Distance(current, start) <= 0.1f && direction == true ){
				direction = false;
			}

			print(direction);
			print (Vector3.Distance(current, end));

			if(direction == false){
				transform.localRotation = Quaternion.Lerp(Quaternion.Euler(start), Quaternion.Euler(end), speed);
			}
			if(direction == true){
				transform.localRotation = Quaternion.Lerp(Quaternion.Euler(end), Quaternion.Euler(start), speed);
			}
		}
	}
}

using UnityEngine;
using System.Collections;

public class AnimController : MonoBehaviour {
	public GameObject[] targets;
	public int[] type;
	public bool active;
	private int counter;

	// Use this for initialization
	void Start () {
	
	}

	void Trigger(){
		active = !active;
	}

	// Update is called once per frame
	void Update () {
		counter = 0;
		if(active){
			foreach (GameObject target in targets){
				if(type[counter] == 0){
					//target.
				}
				counter++;
			}
		}
	}
}

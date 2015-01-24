using UnityEngine;
using System.Collections;

public class NodListener : MonoBehaviour {
	public int buffersize;
	public bool nodding;
	public Vector3[] orientations;
	public Vector3[] derivatives;
	public Vector3[] smoothderivatives;
	public float[] highpoints;  
	private int index;
	private int i;
	private int numhighlights;
	private int nodtest;


	// Use this for initialization
	void Start () {
		nodding = false;
		numhighlights = 20;
		nodtest = 0;
		orientations = new Vector3[buffersize];
		derivatives = new Vector3[buffersize-1];
		smoothderivatives = new Vector3[buffersize-5];
		highpoints = new float[numhighlights];
	}
	
	// Update is called once per frame
	void Update () {
		//load latest orientation data into array
		index = Time.frameCount%buffersize;
		orientations[index] = transform.rotation.eulerAngles;
		if(index >= 1){
			derivatives[index-1] = orientations[index] - orientations[index-1];
		}
		//smooth samples together to ensure more consistent data
		if(index >= 5){
			for(i = 0; i < 5; i++){
				smoothderivatives[index-5] += derivatives[index-5+i];
			}
			smoothderivatives[index-5] /= 5;
		}
		//collect high data points into nod test array 
		if(index >= 5){
			highpoints[Mathf.RoundToInt(Time.timeSinceLevelLoad*numhighlights*2)%numhighlights] = 0.0f;
			if(Mathf.Abs(smoothderivatives[index-5].x) > 0.4f){
				if(Mathf.Abs(smoothderivatives[index-5].x) > Mathf.Abs(smoothderivatives[index-5].y) && (Mathf.Abs(smoothderivatives[index-5].x) > Mathf.Abs(smoothderivatives[index-5].z))){
					highpoints[Mathf.RoundToInt(Time.timeSinceLevelLoad*numhighlights*2)%numhighlights] = smoothderivatives[index-5].x;
				}
			}

		}
		nodtest = 0;
		for(i = 1; i < numhighlights-1; i++){
			if(highpoints[i-1] != 0 && highpoints[i] !=0.0){
				if (Mathf.Sign(highpoints[i-1]) != Mathf.Sign(highpoints[i])){
					nodtest++;
				}
			}
		}
		if (nodtest >= 2){
			nodding = true;
			//print ("You nodded!");
		}else{
			nodding = false;
			//print ("|");
		}
	



	}
}
